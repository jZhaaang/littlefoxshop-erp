import { useState } from 'react';
import { EntityForm, type FieldConfig, type Mode } from '../common';
import type { ExpenseInsert } from '../../lib/supabase/models';

const EMPTY: ExpenseInsert = {
  name: '',
  description: '',
  cost_rmb: 0,
  cost_usd: 0,
};

type Props = {
  type: Mode;
  initial?: ExpenseInsert;
  onCancel: () => void;
  onSubmit: (values: ExpenseInsert) => Promise<void> | void;
};

export function ExpenseForm({ type, initial, onCancel, onSubmit }: Props) {
  const [currency, setCurrency] = useState<'RMB' | 'USD'>('RMB');

  const fields: FieldConfig<ExpenseInsert>[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'e.g. Etsy Membership Fee',
      colSpan: 4,
      validate: (v) => (!v ? 'Name is required' : null),
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'e.g. Etsy monthly membership fee',
      colSpan: 4,
    },
    {
      name: 'cost_rmb',
      label: `Cost (${currency})`,
      type: 'number',
      parse: (s) => Number(s),
      validate: (v) => (Number(v) < 0 ? 'Must be ≥ 0' : null),
    },
  ];

  const initialValues: ExpenseInsert = { ...EMPTY, ...(initial ?? {}) };

  const handleSubmit = (values: ExpenseInsert) => {
    const converted =
      currency === 'RMB'
        ? { cost_rmb: values.cost_rmb, cost_usd: values.cost_rmb * 0.14 }
        : { cost_usd: values.cost_rmb, cost_rmb: values.cost_rmb / 0.14 };

    onSubmit({ ...values, ...converted });
  };

  return (
    <div>
      <EntityForm<ExpenseInsert>
        mode={type}
        initial={initialValues}
        fields={fields}
        onCancel={onCancel}
        onSubmit={handleSubmit}
        submitText={type === 'edit' ? 'Save Changes' : 'Add Expense'}
      >
        <div className="mb-2 flex items-center justify-end gap-2">
          <label className="text-sm text-slate-600">Currency:</label>
          <select
            className="rounded-md border px-2 py-1 text-sm"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'RMB' | 'USD')}
          >
            <option value="RMB">RMB ¥</option>
            <option value="USD">USD $</option>
          </select>
        </div>
      </EntityForm>
    </div>
  );
}
