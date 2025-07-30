'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from 'react-i18next'; 
ChartJS.register(ArcElement, Tooltip, Legend);

export default function VoteChart({ yesPercent, noPercent }) {
  const { t } = useTranslation();
  const data = {
    labels: [t('yes'), t('no')],
    datasets: [
      {
        label: t('votes'),
        data: [parseFloat(yesPercent), parseFloat(noPercent)],
        backgroundColor: ['#28a745', '#dc3545'], 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '200px', height: '200px', margin: 'auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
