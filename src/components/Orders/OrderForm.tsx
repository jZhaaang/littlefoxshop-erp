import { useState } from 'react';
import { EntityForm, type FieldConfig, type Mode } from '../common';
import type {
  Product,
  OrderItemInsert,
  OrderWithItemsInsert,
} from '../../lib/supabase/models';
import { OrderItemsForm } from './OrderItemsForm';

const EMPTY: OrderWithItemsInsert = {
  order_no: '',
  order_date: new Date().toISOString(),
  date_fulfilled: null,
  customer_name: '',
  delivery_fee: 0,
  other_fees: 0,
  notes: '',
  orderItems: [],
};

type Props = {
  type: Mode;
  initial?: OrderWithItemsInsert;
  products: Product[];
  onCancel: () => void;
  onSubmit: (values: OrderWithItemsInsert) => Promise<void> | void;
};

const fields: FieldConfig<OrderWithItemsInsert>[] = [
  {
    name: 'order_no',
    label: 'Order Number',
    type: 'text',
    placeholder: '#123456789',
    colSpan: 2,
    validate: (v) => (!v ? 'Order Number is required' : null),
  },
  {
    name: 'customer_name',
    label: 'Customer Name',
    type: 'text',
    colSpan: 2,
    validate: (v) => (!v ? 'Customer Name is required' : null),
  },
  {
    name: 'order_date',
    label: 'Order Date',
    type: 'datetime',
    colSpan: 2,
  },
  {
    name: 'date_fulfilled',
    label: 'Date Fulfilled',
    type: 'datetime',
    colSpan: 2,
  },
  {
    name: 'delivery_fee',
    label: 'Delivery Fee',
    type: 'text',
    colSpan: 2,
  },
  {
    name: 'other_fees',
    label: 'Other Fees',
    type: 'number',
    colSpan: 2,
    parse: (s) => Number(s),
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'textarea',
    colSpan: 4,
    breakBefore: true,
  },
];

export function OrderForm({
  type,
  initial,
  products,
  onCancel,
  onSubmit,
}: Props) {
  const initialValues: OrderWithItemsInsert = {
    ...EMPTY,
    ...(initial ?? []),
  };

  const [orderItems, setOrderItems] = useState<OrderItemInsert[]>(
    initialValues.orderItems ?? []
  );

  const handleSubmit = (values: OrderWithItemsInsert) => {
    const payload = {
      ...values,
      orderItems,
    };
    onSubmit(payload);
  };

  return (
    <EntityForm<OrderWithItemsInsert>
      mode={type}
      initial={initialValues}
      fields={fields}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitText={type === 'edit' ? 'Save Changes' : 'Add Order'}
    >
      <OrderItemsForm
        orderItems={orderItems}
        products={products}
        onChange={setOrderItems}
      />
    </EntityForm>
  );
}
