const getRequiredFields = (isAdmin): string[] => {
  const _fields = [
    'firstName',
    'lastName',
    'username',
    'mobileNumber',
    'companyName',
    'group',
    'subgroup',
    'category',
    'manager',
    'location',
    'rspEmail',
    ...(isAdmin ? [] : ['password']),
  ];

  return _fields;
};
export const requiredFieldsAreFilled = (
  object: PersonalInfo | CompanyInfo | ServiceProvider,
  requiredFields: string[],
): boolean => {
  for (const key in object) {
    if (object.hasOwnProperty(key) && requiredFields.includes(key)) {
      if (object[key] === '') {
        return false;
      }
    }
  }
  return true;
};

export const signup = (
  action: 'next' | 'previous' | 'submit',
  activeTab: number,
  setActiveTab: React.Dispatch<React.SetStateAction<number>>,
  personalInfo: PersonalInfo,
  companyInfo: CompanyInfo,
  location: string,
  serviceProvider: ServiceProvider,
  isAdmin = false,
) => {
  let _activeTab = 0;
  let proceed = false;

  const _reqFields = getRequiredFields(isAdmin);

  if (action === 'submit' || action === 'next') {
    if (activeTab === 0) proceed = requiredFieldsAreFilled(personalInfo, _reqFields);
    if (activeTab === 1) proceed = requiredFieldsAreFilled(companyInfo, _reqFields);
    if (activeTab === 2) proceed = location !== '';
    if (activeTab === 3) proceed = requiredFieldsAreFilled(serviceProvider, _reqFields);
    if (action === 'next') {
      if (proceed) {
        _activeTab = activeTab < 3 ? activeTab + 1 : activeTab;
        setActiveTab(_activeTab);
      }
    }
  } else if (action === 'previous') {
    _activeTab = activeTab > 0 ? activeTab - 1 : activeTab;
    setActiveTab(_activeTab);
    proceed = true;
  }

  return proceed;
};
