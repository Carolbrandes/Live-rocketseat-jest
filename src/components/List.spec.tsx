import {  render,  waitForElementToBeRemoved, screen } from '@testing-library/react'
import List from './List'
import userEvent from '@testing-library/user-event'

describe('List Component', () => {
    it('should render list items',  () => {
        // getByText,rerender, queryByText ele estao associado a esse render(<List initialItems={['Diego', 'Rodz', 'Mayk']}/>)
        const { getByText,rerender } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']}/>)

        expect(getByText('Diego')).toBeInTheDocument()
        expect(getByText('Rodz')).toBeInTheDocument()
        expect(getByText('Mayk')).toBeInTheDocument()

        rerender(<List initialItems={['Julia']} />)

        // usando o screen ele usa o contexto global
        expect(screen.getByText('Julia')).toBeInTheDocument()
        expect(screen.queryByText('Mayk')).not.toBeInTheDocument()
    })

    it('should be able to add new item to the list', async () => {
        const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]}/>)

        const inputElement = getByPlaceholderText('Novo item')

        const addButton = getByText('Adicionar')


        await userEvent.setup().type(inputElement, 'Novo') // o type digita
        await userEvent.setup().click(addButton)

        // ele roda um loop ate conseguir achar o elemento
        // await waitFor(() => {
        //     expect(getByText('Novo')).toBeInTheDocument() 
        // })

        expect(await findByText('Novo')).toBeInTheDocument()
    })

    it('should be able to remove item to the list', async () => {
        const { getByText, getAllByText } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']}/>)

        const removeButtons = getAllByText('Remover')

        await userEvent.setup().click(removeButtons[0])


        // ele roda um loop ate conseguir achar o elemento
        await waitForElementToBeRemoved(() => {
            return getByText('Diego')
        })

        // outra forma
        // await waitFor(() => {
        //     expect(queryByText('Diego')).not.toBeInTheDocument()
        // })


    })
})