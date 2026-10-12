import { formatRand, formatShortDate } from '../utils/helpers'

const TransactionTable = ({ transactions }) => {
  return (
    <section className="card transactions">
      <h2 className="card__title card__title--small">
        Transactions in this category
      </h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Account</th>
            <th scope="col" className="table__amount">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={3} className="table__empty">
                No transactions yet. Add one above.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{formatShortDate(transaction.date)}</td>
                <td>{transaction.account}</td>
                <td className="table__amount">
                  -{formatRand(transaction.amount)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}

export default TransactionTable
