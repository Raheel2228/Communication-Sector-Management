import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_MANAGERS_QUERY } from 'gql';
import { SelectField } from 'components/FormFields';

interface Props {
  onChange?: (value: string) => void;
  invalid: boolean;
  manager: string;
}

const ManagerDropdown: React.FC<Props> = ({ onChange, invalid, manager }) => {
  const { error, loading, data } = useQuery(GET_ALL_MANAGERS_QUERY);

  let managerOptions = [];

  if (data && data.getAllUserManager) {
    managerOptions = data.getAllUserManager.map(l => {
      return {
        id: l.managerId,
        value: l.managerId,
        label: `${l.managerName} [${l.managerEmail}]`,
      };
    });
  }

  return (
    <SelectField
      placeholder="Select Manager"
      options={managerOptions || []}
      onChange={onChange}
      invalid={invalid}
      value={manager}
      disabled={!!error || loading}
    />
  );
};

export default ManagerDropdown;
