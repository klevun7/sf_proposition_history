'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [propositions, setPropositions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/php-backend/api/getPropositions.php")
      .then(res => setPropositions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">City of San Francisco Historic Ballot Measures</h1>

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
                Proposition: {p.prop} [{p.name}] ({2024})
              </h5>
              <p className="card-text">{p.description}</p>
              <p>
                <strong>Result:</strong> Yes: {yesPercent}% — No: {noPercent}%<br />
                <strong>Votes:</strong> Yes: {voteYes.toLocaleString()} &nbsp;
                No: {voteNo.toLocaleString()}<br />
                <strong>Required to Pass:</strong> {requiredPercent}%<br />
                <strong>Outcome:</strong>{" "}
                <span className={`fw-bold text-${pass ? 'success' : 'danger'}`}>
                  {pass ? 'Passed 🟢' : 'Failed 🔴'}
                </span><br />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
