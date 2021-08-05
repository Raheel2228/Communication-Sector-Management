import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_LOCATIONS_QUERY } from 'gql';
import { SelectField } from 'components/FormFields';

interface Props {
  onChange?: (value: string) => void;
  invalid?: boolean;
  location: string;
  disabled?: boolean;
  alternative?: boolean;
  label?: string;
}

const LocationDropdown: React.FC<Props> = ({ onChange, invalid, location, disabled = false, alternative, label }) => {
  const { error, loading, data } = useQuery(GET_ALL_LOCATIONS_QUERY);

  let locationOptions = [];

  if (data && data.getLocations) {
    locationOptions = data.getLocations.map(l => {
      return {
        id: l.locationId,
        value: l.locationId,
        label: l.locationName,
      };
    });
  }

  return (
    <SelectField
      placeholder="Select Location"
      options={locationOptions || []}
      onChange={onChange}
      invalid={invalid}
      value={location}
      disabled={!!error || loading || disabled}
      alternative={alternative}
      label={label}
    />
  );
};

export default LocationDropdown;
