import { Input } from 'antd';
import { CInputType } from '../../types/FormTypes/CInput.types';

const CInput: React.FC<CInputType> = ({
  name,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      {type === 'password' ? (
        <Input.Password
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${error ? 'border-red-500' : ''}`}
          style={{ width: '100%' }}
          size="large"
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${error ? 'border-red-500' : ''}`}
          style={{ width: '100%' }}
          size="large"
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CInput;
