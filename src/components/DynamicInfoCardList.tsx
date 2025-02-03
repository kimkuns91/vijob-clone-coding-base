'use client';

import dynamic from 'next/dynamic';

const InfoCardList = dynamic(() => import('./InfoCardList'), {
  loading: () => (
    <div className="relative w-full min-h-[370px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
    </div>
  ),
  ssr: false
});

interface DynamicInfoCardListProps {
  currentId: number;
}

const DynamicInfoCardList: React.FC<DynamicInfoCardListProps> = ({ currentId }) => {
  return <InfoCardList currentId={currentId} />;
};

export default DynamicInfoCardList; 