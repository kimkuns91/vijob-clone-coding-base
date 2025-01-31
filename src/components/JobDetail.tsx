import DetailSession from './DetailSession';

const JobDetail = () => {
  const sections = [
    { title: '이런 분들을 선호해요' },
    { title: '근무 조건 및 환경' },  // 섹션 제목 다양화
  ];

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section, index) => (
        <DetailSession key={index} title={section.title} />
      ))}
    </div>
  );
};

export default JobDetail;
