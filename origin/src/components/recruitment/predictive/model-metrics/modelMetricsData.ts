
// Mock model metrics data
export const modelMetrics = {
  overall: {
    accuracy: 89.4,
    precision: 86.2,
    recall: 83.5,
    f1Score: 84.8,
    aucRoc: 92.1,
    trainingDate: '2024-04-15',
    status: 'stable',
    predictionsCount: 1254,
    confidenceLevel: 'alta',
    errorRate: 10.6,
    lastEvaluation: '2024-05-02'
  },
  bySegment: [
    { name: 'Graduação', accuracy: 91.2, precision: 88.4, recall: 85.6, f1Score: 87.0, aucRoc: 93.2 },
    { name: 'Pós-Graduação', accuracy: 86.5, precision: 82.8, recall: 79.3, f1Score: 81.0, aucRoc: 89.5 },
    { name: 'Mestrado', accuracy: 88.7, precision: 85.6, recall: 83.2, f1Score: 84.4, aucRoc: 91.3 },
    { name: 'EAD', accuracy: 84.2, precision: 80.5, recall: 77.1, f1Score: 78.8, aucRoc: 88.7 }
  ],
  history: [
    { date: '2023-11', accuracy: 83.2, precision: 79.5, recall: 75.8, f1Score: 77.6, aucRoc: 86.4 },
    { date: '2023-12', accuracy: 84.7, precision: 81.3, recall: 77.9, f1Score: 79.6, aucRoc: 87.8 },
    { date: '2024-01', accuracy: 85.9, precision: 82.6, recall: 79.4, f1Score: 81.0, aucRoc: 89.1 },
    { date: '2024-02', accuracy: 87.2, precision: 83.9, recall: 81.2, f1Score: 82.5, aucRoc: 90.3 },
    { date: '2024-03', accuracy: 88.5, precision: 85.1, recall: 82.3, f1Score: 83.7, aucRoc: 91.4 },
    { date: '2024-04', accuracy: 89.4, precision: 86.2, recall: 83.5, f1Score: 84.8, aucRoc: 92.1 }
  ]
};

// Helper function to determine badge color based on metric value
export const getBadgeColor = (value: number) => {
  if (value >= 85) return 'bg-green-100 text-green-800';
  if (value >= 75) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
};
