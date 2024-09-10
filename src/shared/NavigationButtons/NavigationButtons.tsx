import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const NavigationButtons: React.FC = () => {
  return (
    <div className="flex items-center justify-between  lg:mt-8 md:mt-6 mt-4">
      <Button
        text="Go Back"
        category="primary"
        onClick={() => window.history.back()}
      />
      <Link to="/">
        <Button
          text="Home"
          category="secondary"
        />
      </Link>
    </div>
  );
};

export default NavigationButtons;
