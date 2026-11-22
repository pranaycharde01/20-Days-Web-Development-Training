
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Employee Management Application', () => {
  it('shows validation errors when the form is empty', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: 'Add Employee' })
    );

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Department is required.')).toBeInTheDocument();
  });

  it('shows an error for an invalid email address', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText('Full Name'), 'Amit Kumar');
    await user.type(screen.getByLabelText('Email Address'), 'invalid-email');
    await user.type(screen.getByLabelText('Department'), 'Engineering');

    await user.click(
      screen.getByRole('button', { name: 'Add Employee' })
    );

    expect(
      screen.getByText('Enter a valid email address.')
    ).toBeInTheDocument();
  });

  it('adds a new employee when the form is valid', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText('Full Name'), 'Amit Kumar');
    await user.type(screen.getByLabelText('Email Address'), 'amit@example.com');
    await user.type(screen.getByLabelText('Department'), 'Engineering');

    await user.click(
      screen.getByRole('button', { name: 'Add Employee' })
    );

    expect(screen.getByText('Amit Kumar')).toBeInTheDocument();
    expect(screen.getByText('amit@example.com')).toBeInTheDocument();
    expect(
      screen.getByText('Employee added successfully!')
    ).toBeInTheDocument();
  });

  it('filters employees by name', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByLabelText('Search Employees'),
      'Rahul'
    );

    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    expect(screen.queryByText('Aarav Sharma')).not.toBeInTheDocument();
    expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
  });

  it('filters employees by department', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByLabelText('Search Employees'),
      'Marketing'
    );

    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    expect(screen.queryByText('Aarav Sharma')).not.toBeInTheDocument();
  });

  it('shows a message when no employees match the search', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByLabelText('Search Employees'),
      'Finance'
    );

    expect(screen.getByText('No employees found.')).toBeInTheDocument();
  });
});
