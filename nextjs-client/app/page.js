'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VoteChart from '@/components/VoteChart/VoteChart';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector'; 
import { useTranslation } from 'react-i18next'; 

export default function Home() {
  const [propositions, setPropositions] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    axios.get(`http://localhost/php-backend/api/getPropositions.php?lang=${currentLang}`)
      .then(res => setPropositions(res.data))
      .catch(err => console.error(err));
  }, [i18n.language]);

  return (
    <div className="container mt-4">
      <LanguageSelector />
      <h2 className="mb-4">{t('title')} [2024] 🌉</h2>

      {propositions.map((p) => {
        const voteYes = parseInt(p.vote_yes);
        const voteNo = parseInt(p.vote_no);
        const totalVotes = voteYes + voteNo;

        const yesPercent = totalVotes > 0 ? ((voteYes / totalVotes) * 100).toFixed(2) : '0.00';
        const noPercent = totalVotes > 0 ? ((voteNo / totalVotes) * 100).toFixed(2) : '0.00';
        const requiredPercent = parseFloat(p.percent_required);

        const pass = parseFloat(yesPercent) >= requiredPercent;

        return (
          <div
            key={p.id}
            className={`card mb-3 border-2 ${pass ? 'border-success' : 'border-danger'}`}
          >
            <div className="card-body">
              <h5 className="card-title">
                 {t('proposition')}: {p.prop} [{p.name}] ({2024})
              </h5>
              <p className="card-text">{p.description}</p>
              <p>
                <strong>{t('result')}:</strong> <strong className='text-success'>{t('yes')}:</strong> {yesPercent}% — <strong className='text-danger'>{t('no')}:</strong> {noPercent}%<br />
                <strong>{t('votes')}:</strong> <strong className='text-success'>{t('yes')}:</strong> {voteYes.toLocaleString()} <strong className='text-danger'>{t('no')}:</strong> {voteNo.toLocaleString()}<br />
                <strong>{t('required')}:</strong> {requiredPercent}%<br />
                <strong>{t('outcome')}:</strong>{" "}
                <span className={`fw-bold text-${pass ? 'success' : 'danger'}`}>
                  {pass ? t('passed') : t('failed')}
                </span><br />
              </p>
            </div>
            <VoteChart yesPercent={yesPercent} noPercent={noPercent} />
          </div>
        );
      })}
    </div>
  );
}
