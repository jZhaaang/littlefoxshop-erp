import { useState } from 'react';
import { EntityForm, type FieldConfig, type Mode } from '..';
import type {
  Product,
  PurchaseItemInsert,
  PurchaseWithItemsInsert,
} from '../../lib/supabase/models';
import { PurchaseItemsForm } from './PurchaseItemsForm';

const EMPTY: PurchaseWithItemsInsert = {
  purchase_order_no: '',
  order_date: new Date().toISOString(),
  shipping_fee_domestic: 0,
  shipping_fee_international: 0,
  date_received: null,
  purchaseItems: [],
};

type Props = {
  type: Mode;
  initial?: PurchaseWithItemsInsert;
  products: Product[];
  onCancel: () => void;
  onSubmit: (values: PurchaseWithItemsInsert) => Promise<void> | void;
};

const fields: FieldConfig<PurchaseWithItemsInsert>[] = [
  {
    name: 'purchase_order_no',
    label: 'Purchase Order Number',
    type: 'text',
    placeholder: '#123456789',
    colSpan: 4,
    validate: (v) => (!v ? 'Purchase Order Number is required' : null),
  },
  {
    name: 'order_date',
    label: 'Order Date',
    type: 'datetime',
    colSpan: 2,
  },
  {
    name: 'date_received',
    label: 'Date Received',
    type: 'datetime',
    colSpan: 2,
  },
  {
    name: 'shipping_fee_domestic',
    label: 'Shipping (Domestic)',
    type: 'number',
    parse: (s) => Number(s),
    validate: (v) => (Number(v) < 0 ? 'Must be ≥ 0' : null),
  },
  {
    name: 'shipping_fee_international',
    label: 'Shipping (International)',
    type: 'number',
    parse: (s) => Number(s),
    validate: (v) => (Number(v) < 0 ? 'Must be ≥ 0' : null),
  },
];

export function PurchaseForm({
  type,
  initial,
  products,
  onCancel,
  onSubmit,
}: Props) {
  const initialValues: PurchaseWithItemsInsert = {
    ...EMPTY,
    ...(initial ?? []),
  };

  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemInsert[]>(
    initialValues.purchaseItems ?? []
  );

  const handleSubmit = (values: PurchaseWithItemsInsert) => {
    const payload = {
      ...values,
      purchaseItems,
    };
    onSubmit(payload);
  };

  return (
    <EntityForm<PurchaseWithItemsInsert>
      mode={type}
      initial={initialValues}
      fields={fields}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitText={type === 'edit' ? 'Save Changes' : 'Add Purchase'}
    >
      <PurchaseItemsForm
        purchaseItems={purchaseItems}
        products={products}
        onChange={setPurchaseItems}
      />
    </EntityForm>
  );
}
