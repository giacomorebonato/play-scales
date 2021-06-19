import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { ScaleSelect } from '../'

describe('scale-select', () => {
  it('renders its label', () => {
    const { getByText } = render(
      <ScaleSelect onChange={jest.fn()} scaleId={3} />
    )

    expect(
      getByText(/Which music scale are you looking for/g)
    ).toBeInTheDocument()
  })

  it('passes scaleId and scaleName on change', () => {
    const mockOnChange = jest.fn()
    const { getByTestId } = render(
      <ScaleSelect onChange={mockOnChange} scaleId={3} />
    )

    fireEvent.change(getByTestId('scale-select'), {
      target: {
        value: '3'
      }
    })

    expect(mockOnChange).toHaveBeenCalledWith({
      scaleId: 3,
      scaleName: 'augmented heptatonic'
    })
  })

  it('renders a toggle for showing advanced scales', () => {
    const { debug, getByTestId, getByText } = render(
      <ScaleSelect onChange={jest.fn()} scaleId={3} />
    )

    expect(getByText(/All scales/g)).toBeInTheDocument()

    fireEvent.click(getByTestId('scale-select-toggle'))

    expect(getByText(/Main scales/g)).toBeInTheDocument()
  })
})
