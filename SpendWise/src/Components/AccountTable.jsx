import Accounts from "../Accounts"
import {formatRand} from `/utils/helpers`

const Accountable = ({Accounts = [], onDelete})=> {
return (
    <section className="card accounts">
      <h2 className="card__title card__title--small">Your accounts</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col" className="table__amount">
              Initial balance
            </th>
            {onDelete && <th scope="col" />}
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan={onDelete ? 4 : 3} className="table__empty">
                No accounts yet. Add one above.
              </td>
            </tr>
          ) : (
            accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td className="table__amount">
                  {formatRand(account.initialBalance)}
                </td>
                {onDelete && (
                  <td>
                    <button
                      type="button"
                      onClick={() => onDelete(account.id)}
                      aria-label={`Delete ${account.name}`}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}

export default AccountTable







