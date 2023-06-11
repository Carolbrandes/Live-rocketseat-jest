import { useState } from "react"

type ListProps = {
    initialItems: string[]
}

function List({initialItems}: ListProps) {
  const [list, setList] = useState(initialItems)
  const [newItem, setNewItem] = useState('')

  function addToList() {
    // simulando o envio para uma api
    setTimeout(() => {
      setList(state => [...state, newItem])
    }, 500);
  }

  function removeFromList(selectedItem: string) {
    // simulando o envio para uma api
    setTimeout(() => {
      setList(state => state.filter(item => item != selectedItem))
    }, 500);
  }

  return (
    <>
      <input placeholder="Novo item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />

      <button onClick={addToList}>Adicionar</button>

      <ul>
        {list.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>

    </>
  )
}

export default List
