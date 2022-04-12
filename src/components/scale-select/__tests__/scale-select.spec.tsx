import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { ScaleSelect } from '..'

describe('scale-select', () => {
  it('renders its label', () => {
    const { getByText } = render(
      <ScaleSelect onChange={jest.fn()} scale='major' />,
    )

    expect(
      getByText(/Which music scale are you looking for/g),
    ).toBeInTheDocument()
  })

  it('passes a scale on change', () => {
    const mockOnChange = jest.fn()
    const { getByTestId } = render(
      <ScaleSelect onChange={mockOnChange} scale='major' />,
    )

    fireEvent.change(getByTestId('scale-select'), {
      target: {
        value: 'harmonic minor',
      },
    })

    expect(mockOnChange).toHaveBeenCalledWith('harmonic minor')
  })

  it('renders a toggle for showing advanced scales', () => {
    const { getByTestId, getByText } = render(
      <ScaleSelect onChange={jest.fn()} scale='major' />,
    )

    expect(getByText(/All scales/g)).toBeInTheDocument()

    fireEvent.click(getByTestId('scale-select-toggle'))

    expect(getByText(/Main scales/g)).toBeInTheDocument()
  })
})
