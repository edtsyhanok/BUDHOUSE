'use client';

import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

interface OrderFormProps {
  categoryName: string;
  placeholders: {
    name: string;
    phone: string;
  };
  buttonTexts: {
    idle: string;
    loading: string;
    success: string;
    error: string;
  };
}

// Экспортируем интерфейс, чтобы HomeLanding мог его использовать для типизации useRef
export interface OrderFormRef {
  focusNameInput: () => void;
}

const OrderForm = forwardRef<OrderFormRef, OrderFormProps>(
  ({ categoryName, placeholders, buttonTexts }, ref) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const nameInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focusNameInput: () => {
        const input = nameInputRef.current;

        if (!input) return;

        input.focus({ preventScroll: true });

        // Помещаем курсор в конец текста
        const cursorPosition = input.value.length;

        try {
          input.setSelectionRange(cursorPosition, cursorPosition);
        } catch {
          // Некоторые версии Safari могут не поддерживать setSelectionRange
        }
      },
    }));


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!name.trim() || !phone.trim()) return;
      setStatus('loading');

      try {
        const res = await fetch('/api/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            category: categoryName,
          }),
        });

        if (res.ok) {
          setStatus('success');
          setName('');
          setPhone('');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          ref={nameInputRef}
          type='text'
          placeholder={placeholders.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: '14px 16px',
            borderRadius: '12px',
            border: '1px solid #333',
            background: '#1a1a24a7',
            color: '#fff',
            caretColor: '#ffffff',
            fontSize: '16px',
            outline: 'none',
            WebkitAppearance: 'none',
            WebkitUserSelect: 'text',
            userSelect: 'text',
          }}
        />

        <input
          type='tel'
          placeholder={placeholders.phone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{
            padding: '14px 16px', borderRadius: '12px', border: '1px solid #333',
            background: '#1a1a24a7', color: '#fff', fontSize: '16px'
          }}
        />

        <button
          type='submit'
          disabled={status === 'loading'}
          style={{
            padding: '16px', background: status === 'success' ? '#34c759' : '#005426a6',
            color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer'
          }}
        >
          {status === 'loading' && buttonTexts.loading}
          {status === 'success' && buttonTexts.success}
          {status === 'error' && buttonTexts.error}
          {status === 'idle' && buttonTexts.idle}
        </button>
      </form>
    );
  }
);

OrderForm.displayName = 'OrderForm';

export default OrderForm;
