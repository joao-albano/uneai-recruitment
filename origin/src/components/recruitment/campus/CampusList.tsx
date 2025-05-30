
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Phone, Building, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Campus } from '@/types/recruitment/campus';
import CampusDialog from './CampusDialog';
import DeleteCampusDialog from './DeleteCampusDialog';
import { useCampus } from './hooks/useCampus';
import { Badge } from '@/components/ui/badge';

const CampusList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  
  const { campuses, isLoading } = useCampus();
  
  // Filtrar campi de acordo com o termo de busca
  const filteredCampuses = campuses.filter(campus => 
    campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campus.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campus.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (campus: Campus) => {
    setSelectedCampus(campus);
    setEditDialogOpen(true);
  };

  const handleDelete = (campus: Campus) => {
    setSelectedCampus(campus);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, cidade ou estado..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCampuses.length === 0 ? (
        <div className="bg-muted rounded-lg p-8 text-center">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium">Nenhuma unidade encontrada</h3>
          <p className="text-muted-foreground mt-2">
            {searchTerm 
              ? "Tente buscar com termos diferentes ou cadastre uma nova unidade."
              : "Você ainda não cadastrou unidades. Adicione sua primeira unidade para começar."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampuses.map((campus) => (
            <Card key={campus.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{campus.name}</h3>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(campus)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(campus)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      {campus.address}<br />
                      {campus.city}, {campus.state} - {campus.zipCode}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">{campus.phone}</div>
                  </div>
                </div>

                {campus.courses && campus.courses.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Cursos Disponíveis:</h4>
                    <div className="flex flex-wrap gap-1">
                      {campus.courses.slice(0, 3).map((course, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {course.name}
                        </Badge>
                      ))}
                      {campus.courses.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{campus.courses.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedCampus && (
        <>
          <CampusDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            campus={selectedCampus}
            mode="edit"
          />
          <DeleteCampusDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            campus={selectedCampus}
          />
        </>
      )}
    </div>
  );
};

export default CampusList;
