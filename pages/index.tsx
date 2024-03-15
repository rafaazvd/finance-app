// pages/index.tsx

interface ITransaction {
  effectedAt: string;
  value: number;
  description: string;
}

interface IProps {
  transactions: ITransaction[];
}

export async function getServerSideProps() {
  // Aqui você faria a chamada para o endpoint da API para obter os dados
  // Por enquanto, vamos usar esses dados mocados
  const transactions: ITransaction[] = [
    { effectedAt: "2024-03-14", value: 100, description: "Crédito" },
    { effectedAt: "2024-03-15", value: -50, description: "Débito" },
    { effectedAt: "2024-03-16", value: 150, description: "Crédito" },
    { effectedAt: "2024-03-17", value: -30, description: "Crédito" },
    { effectedAt: "2024-03-17", value: 20, description: "Débito" },
    { effectedAt: "2024-03-17", value: -300, description: "Crédito" },
    { effectedAt: "2024-03-17", value: 900, description: "Débito" },
    { effectedAt: "2024-03-17", value: -130, description: "Débito" },
  ];


  return {
    props: {
      transactions,
    },
  };
}

  

const TransactionsPage = ( props: IProps ) => {

  // Calcular total de entradas, total de saídas e saldo
  const totalEntradas = props.transactions.reduce((acc, curr) => curr.value > 0 ? acc + curr.value : acc, 0);
  const totalSaidas = props.transactions.reduce((acc, curr) => curr.value < 0 ? acc + curr.value : acc, 0);
  const saldo = totalEntradas + totalSaidas;
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Extrato de Transações</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.transactions.map((transaction, index) => (
            <tr key={index} className={transaction.value >= 0 ? "bg-blue-100" : "bg-red-100"}>
              <td className="px-6 py-4 whitespace-nowrap text-black">{transaction.effectedAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{transaction.value}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Componente para mostrar total de entradas, total de saídas e saldo */}
      <div className={`p-4 mt-4 rounded ${saldo >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
        <p className="text-black">Total de Entradas: {totalEntradas}</p>
        <p className="text-black">Total de Saídas: {totalSaidas}</p>
        <p className="text-black">Saldo: {saldo}</p>
      </div>
    </div>
  );
};



export default TransactionsPage;
