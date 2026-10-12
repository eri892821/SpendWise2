import { getIcon } from '../utils/icons'
import { formatRand } from '../utils/helpers'

const BudgetSummary = ({ category }) => {
  const { name, icon, budget, transactions } = category
  const Icon = getIcon(icon)

  // spent is worked out from the transactions, so it can never get out of sync
  const spent = transactions.reduce((sum, t) => sum + t.amount, 0)
  const percent = Math.min((spent / budget) * 100, 100)

  return (
    <section className="card budget-summary">
      <header className="budget-summary__header">
        <Icon size={34} strokeWidth={1.6} />
        <div>
          <h2 className="budget-summary__title">{name}</h2>
          <p className="budget-summary__target">
            Budget target: {formatRand(budget)} / month
          </p>
        </div>
      </header>

      <div className="budget-summary__figures">
        <span>{formatRand(spent)} spent</span>
        <span>of {formatRand(budget)}</span>
      </div>

      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={budget}
        aria-valuenow={spent}
        aria-label={`${name} budget used`}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </section>
  )
}

export default BudgetSummary
