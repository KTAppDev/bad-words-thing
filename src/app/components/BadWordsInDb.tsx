
import React, { useEffect, useState } from 'react';
// export const dynamic = 'force-dynamic'
const BadWordsInDb: React.FC = () => {
  const [bwcount, setbwcount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getbwcount', { cache: 'no-store' });
        const data = await response.json();
        setbwcount(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-sm text-center mb-4 w-full text-gray-400">{bwcount} bad words in db</div>
  );
};

export default BadWordsInDb;
