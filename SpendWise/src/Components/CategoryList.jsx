import { useState } from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import { getIcon } from '../utils/icons'

const CategoryList = ({ categories, selectedId, onSelect, onAdd }) => {
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim()) return
    onAdd(name.trim())
    setName('')
    setAdding(false)
  }

  return (
    <section className="card category-list" aria-label="Categories">
      <ul className="category-list__items">
        {categories.map((category) => {
          const Icon = getIcon(category.icon)
          return (
            <li key={category.id}>
              <button
                type="button"
                className={`category-list__item ${
                  category.id === selectedId ? 'is-selected' : ''
                }`}
                onClick={() => onSelect(category.id)}
              >
                <Icon size={24} strokeWidth={1.6} />
                <span className="category-list__label">{category.name}</span>
                <ChevronRight size={18} />
              </button>
            </li>
          )
        })}
      </ul>

      <hr className="category-list__divider" />

      {adding ? (
        <form className="new-category-form" onSubmit={handleSubmit}>
          <input
            autoFocus
            className="field__input"
            placeholder="Category name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => !name && setAdding(false)}
          />
          <button type="submit" className="btn btn--primary">
            Save
          </button>
        </form>
      ) : (
        <button
          type="button"
          className="new-category"
          onClick={() => setAdding(true)}
        >
          <Plus size={20} />
          <span>New category</span>
        </button>
      )}
    </section>
  )
}

export default CategoryList
