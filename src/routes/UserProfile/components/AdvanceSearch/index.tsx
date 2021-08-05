import React from 'react';
import { TextField, SelectField } from 'components/FormFields';
import { selectOptions } from 'model/mockups';
import { GET_GROUPS_SERVICE } from 'services';

export interface Options {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  group?: string;
  subgroup?: string;
  location?: string;
  category?: string;
}

interface Groups {
  value: string;
  label: string;
}
interface Props {
  onChangeAdvanceSearch(options: Options): void;
}
const AdvanceSearch: React.FC<Props> = ({ onChangeAdvanceSearch }) => {
  const [options, setOptions] = React.useState<Options>({});
  const [groups, setGroups] = React.useState<Array<Groups>>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string): void => {
    setOptions({ ...options, [fieldName]: e.currentTarget.value });
  };
  const handleSelectChange = (value: string, fieldName: string): void => {
    setOptions({ ...options, [fieldName]: value });
  };

  React.useEffect(() => {
    onChangeAdvanceSearch(options);
  }, [options]);

  React.useEffect(() => {
    GET_GROUPS_SERVICE().then(response => {
      let _data = response.data?.getGroupHierList;
      _data = _data.map(item => {
        return {
          value: item.groupId,
          label: item.groupName,
        };
      });
      _data.unshift({
        value: '',
        label: 'All groups',
      });
      setGroups(_data);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          onChange={e => handleInputChange(e, 'firstName')}
          placeholder="First Name"
          style={{ marginRight: '10px' }}
          value={options['firstName']}
        />
        <TextField
          onChange={e => handleInputChange(e, 'lastName')}
          placeholder="Last Name"
          style={{ marginRight: '10px' }}
          value={options['lastName']}
        />
        <TextField
          onChange={e => handleInputChange(e, 'email')}
          placeholder="Email"
          style={{ marginRight: '10px' }}
          value={options['email']}
        />
        <TextField
          onChange={e => handleInputChange(e, 'company')}
          placeholder="Company"
          style={{ marginRight: '10px' }}
          value={options['company']}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SelectField
          onChange={value => handleSelectChange(value, 'group')}
          options={groups}
          style={{ marginRight: '10px' }}
          placeholder="Group"
          disabled={groups?.length > 0 ? false : true}
        />
        <SelectField
          onChange={value => handleSelectChange(value, 'subgroup')}
          options={selectOptions}
          style={{ marginRight: '10px' }}
          multiple={true}
          placeholder="Subgroup"
          // disabled={data ? false : true}
        />
        <TextField
          placeholder="Location"
          style={{ marginRight: '10px' }}
          onChange={e => handleInputChange(e, 'location')}
          value={options['location']}
        />
        <TextField
          placeholder="Category"
          style={{ marginRight: '10px' }}
          onChange={e => handleInputChange(e, 'category')}
          value={options['category']}
        />
      </div>
    </div>
  );
};

export default AdvanceSearch;
