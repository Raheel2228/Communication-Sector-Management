import React from 'react';
import { SelectField } from 'components/FormFields';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_GROUPS_QUERY } from 'gql';
import { keyBy, Dictionary } from 'lodash';

/**
 *
 * Warning
 * Need to provide UserProfile client in context
 */

interface Props {
  onChangeGroup?: (value: string, groupObject?: Record<string, $TSFixMe> | undefined) => void;
  onChangeSubgroup?: (value: string, subgroupObject?: Record<string, $TSFixMe> | undefined) => void;
  onChangeCategory?: (value: string) => void;
  isGroupInvalid?: boolean;
  isSubGroupInvalid?: boolean;
  isCategoryInvalid?: boolean;
  layout?: 'row' | 'col';
  group: string;
  subgroup: string;
  category: string;
}

const GroupsDropdown: React.FC<Props> = ({
  onChangeGroup,
  onChangeSubgroup,
  onChangeCategory,
  isGroupInvalid,
  isSubGroupInvalid,
  isCategoryInvalid,
  layout,
  group,
  subgroup,
  category,
}) => {
  const { error, loading, data } = useQuery(GET_ALL_GROUPS_QUERY);

  const [_group, setGroup] = React.useState(group);
  const [_subgroup, setSubgroup] = React.useState(subgroup);
  const [_category, setCategory] = React.useState(category);

  const [subgroupsByKey, setSubgroupsByKey] = React.useState<Dictionary<$TSFixMe>>();

  const [subgroupOptions, setSubgroupOptions] = React.useState();
  const [categoryOptions, setCategoryOptions] = React.useState();

  let groupOptions = [];
  let groupsByKey: Dictionary<$TSFixMe>;

  const _onChange = (value: string, type: 'group' | 'subgroup' | 'category') => {
    if (type === 'group') {
      setGroup(value);
      onChangeGroup && onChangeGroup(value, groupsByKey && groupsByKey[value]);
    } else if (type === 'subgroup') {
      setSubgroup(value);
      onChangeSubgroup && onChangeSubgroup(value, subgroupsByKey && subgroupsByKey[value]);
    } else if (type === 'category') {
      setCategory(value);
      onChangeCategory && onChangeCategory(value);
    }
  };

  if (data && data.getAllGroups) {
    groupOptions = data.getAllGroups.map(g => {
      return {
        id: g.groupId,
        value: g.groupId,
        label: g.groupName,
      };
    });

    groupsByKey = keyBy(data.getAllGroups, 'groupId');
  }

  React.useEffect(() => {
    if (_group) {
      setSubgroup('');
      setCategory('');
      const _subgroupOptions = groupsByKey[_group].subGroup.map(s => {
        return {
          id: s.subGroupId,
          value: s.subGroupId,
          label: s.subGroupName,
        };
      });
      setSubgroupOptions(_subgroupOptions);
      const _subgroupsByKey = keyBy(groupsByKey[_group].subGroup, 'subGroupId');
      setSubgroupsByKey(_subgroupsByKey);
    }
  }, [_group]);

  React.useEffect(() => {
    if (_subgroup && subgroupsByKey) {
      setCategory('');
      const _categoryOptions = subgroupsByKey[_subgroup]?.groupCategory?.map(c => {
        return {
          id: c.groupCategoryId,
          value: c.groupCategoryId,
          label: c.groupCategoryName,
        };
      });
      setCategoryOptions(_categoryOptions);
    }
  }, [_subgroup]);

  return (
    <div
      style={
        layout === 'col' ? { display: 'flex', flexDirection: 'column' } : { display: 'flex', flexDirection: 'row' }
      }
    >
      <SelectField
        placeholder="Select Group"
        options={groupOptions || []}
        onChange={value => _onChange(value, 'group')}
        value={_group}
        disabled={!!error || loading}
        invalid={isGroupInvalid}
      />

      <SelectField
        placeholder="Select Subgroup"
        options={subgroupOptions || []}
        onChange={value => _onChange(value, 'subgroup')}
        value={_subgroup}
        disabled={!subgroupOptions}
        invalid={isSubGroupInvalid}
      />

      <SelectField
        placeholder="Select Category"
        options={categoryOptions || []}
        onChange={value => _onChange(value, 'category')}
        value={_category}
        disabled={!categoryOptions}
        invalid={isCategoryInvalid}
      />
    </div>
  );
};

export default GroupsDropdown;
