import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Location } from './Location'

test('entering valid numbers and clicking "next" adds a location', async () => {
  const { getByLabelText, getByText } = render(
    <Location dispatch={() => {}} canAddNext={true} />
  )
  const latitudeInput = getByLabelText('latitude')
  const longitudeInput = getByLabelText('longitude')
  // I'd prefer to test that validation is wired up right, but
  // this bug in jsdom prevents form validation from preventing submission:
  // https://github.com/jsdom/jsdom/issues/2898
  await act(async () => {
    fireEvent.change(latitudeInput, { target: { value: '90' } })
  })
  await act(async () => {
    fireEvent.change(longitudeInput, { target: { value: '42' } })
  })
  await act(async () => {
    fireEvent.click(getByText('Next'))
  })
  expect(getByText('Location Added!')).toBeInTheDocument()
})
