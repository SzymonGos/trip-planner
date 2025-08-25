import { FC } from 'react';
import { Trip as TTrip } from 'tp-graphql-types';
import cx from 'classnames';

type TripCardStatusLabelProps = {
  status: TTrip['status'];
};

export const TripCardStatusLabel: FC<TripCardStatusLabelProps> = ({ status }) => (
  <div
    className={cx('absolute top-2 right-2 p-2 bg-tp-gray-100 text-tp-primary text-xs rounded-md', {
      'bg-tp-white-100': status === 'planning',
      'bg-green-100': status === 'completed',
    })}
  >
    {status}
  </div>
);
