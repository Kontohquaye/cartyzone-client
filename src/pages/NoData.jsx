import noData from "../assets/No data-pana.svg";

const NoData = () => {
  return (
    <div className="no-data min-h-[500px]  max-h-[700px] overflow-hidden">
      <img src={noData} alt={noData} className="w-full h-full object-contain" />
    </div>
  );
};

export default NoData;
