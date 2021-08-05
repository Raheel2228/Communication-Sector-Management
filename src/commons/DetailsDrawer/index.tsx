import React from 'react';
import { MyDrawer, CloseButton } from './styled.components';
import { Close } from '@material-ui/icons';
import { SpinLoader } from 'components';

interface Props {
  onExit?: () => void;
  updateQuery?: $TSFixMe;
}

const renderSwitch = (context: string | null) => {
  switch (context) {
    case 'USER_PROFILE':
      return React.lazy(() => import('./../../routes/UserProfile/components/Drawer'));
    case 'DATA_CENTER':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/DataCenter'));
    case 'CORE_SWITCH':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/CoreSwitch'));
    case 'CORE_SWITCH_SLOT':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/CoreSwtichSlot'));
    case 'CORE_SWITCH_PORT':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/CoreSwitchPort'));
    case 'OLT':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/Olt'));
    case 'OLT_SLOT':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/OltSlot'));
    case 'OLT_PORT':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/OltPort'));
    case 'ODB':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/OdbSdu'));
    case 'FDT':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/Fdt'));
    case 'FDT_SPLITTER':
      return React.lazy(() => import('../../routes/AssetManagement/components/Drawer/FdtSplitter'));
    case 'INTERCONNECT':
      return React.lazy(() => import('../../routes/B2BCatalog/components/Drawer/Drawer'));
    case 'RESIDENTIAL':
      return React.lazy(() => import('../../routes/B2BCatalog/components/Drawer/Drawer'));
    case 'BUSINESS':
      return React.lazy(() => import('../../routes/B2BCatalog/components/Drawer/Drawer'));
    case 'ANCILLARY':
      return React.lazy(() => import('../../routes/B2BCatalog/components/Drawer/Drawer'));
    case 'INTERCONNECT_SUB':
      return React.lazy(() => import('../../routes/B2BSubscriptions/components/Drawer/Drawer'));
    case 'RESIDENTIAL_SUB':
      return React.lazy(() => import('../../routes/B2BSubscriptions/components/Drawer/Drawer'));
    case 'BUSINESS_SUB':
      return React.lazy(() => import('../../routes/B2BSubscriptions/components/Drawer/Drawer'));
    case 'ANCILLARY_SUB':
      return React.lazy(() => import('../../routes/B2BSubscriptions/components/Drawer/Drawer'));
    case 'undefined':
      return <h4>Context Not Found!</h4>;
    default:
      return <h4>Context Not Found!</h4>;
  }
};
const DetailsDrawer: React.FC<Props> = props => {
  const { onExit } = props;
  const [open, setOpen] = React.useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const context = urlParams.get('context');
  const id = urlParams.get('id');
  const Component: $TSFixMe = renderSwitch(context);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const onCloseHandle = (): void => {
    onExit && onExit();
    setOpen(!open);
  };
  return (
    <>
      <MyDrawer anchor="right" variant="persistent" open={open}>
        <CloseButton onClick={onCloseHandle}>
          <Close />
        </CloseButton>
        {context && (
          <React.Suspense fallback={<SpinLoader />}>
            <Component id={id} onCloseHandle={onCloseHandle} {...props} />
          </React.Suspense>
        )}
      </MyDrawer>
    </>
  );
};

export default DetailsDrawer;
