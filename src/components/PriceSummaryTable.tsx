interface PriceSummaryTableProps {
  multiplier: number;
  totalPrice: number;
}

const PriceSummaryTable: React.FC<PriceSummaryTableProps> = ({ multiplier, totalPrice }) => {
  return (
    <table className="w-[60%] text-right ml-auto mr-0 text-xs">
      <tbody>
        <tr>
        <th className="border-white p-2">Nombres d&apos;unités</th>
          <td className="price text-white pl-2">{multiplier}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PriceSummaryTable;
