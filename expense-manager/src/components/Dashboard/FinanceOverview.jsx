import ExpenseTransactions from './ExpenseTransactions';

const FinanceOverview = ({ transactions, onDelete, onEdit }) => {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Finance Overview</h1>
            <ExpenseTransactions transactions={transactions} onDelete={onDelete} onEdit={onEdit} />
        </div>
    );
};

export default FinanceOverview;