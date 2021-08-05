const navigation = [
  {
    label: 'Home',
    slug: '/',
    icon: 'home',
  },
  {
    label: 'Profile',
    slug: '/user_profile',
    icon: 'userGroup',
    subMenu: [
      {
        label: 'Project Users',
        slug: '?activeTab=projectUser',
      },
      {
        label: 'Service Provider',
        slug: '?activeTab=serviceProvider',
      },
      {
        label: 'Residential Accounts',
        slug: '?activeTab=residentialAccounts',
      },
      {
        label: 'Business Accounts',
        slug: '?activeTab=businessAccounts',
      },
      {
        label: 'Priority Accounts',
        slug: '?activeTab=priorityAccounts',
      },
    ],
  },
  {
    label: 'Asset Management',
    slug: '/asset_management',
    icon: 'userSettings',
    subMenu: [
      {
        label: 'DC',
        slug: '?activeTab=dc',
      },
      {
        label: 'Core Switches',
        slug: '?activeTab=coreSwitches',
      },
      {
        label: 'OLT',
        slug: '?activeTab=olt',
      },
      {
        label: 'FDT',
        slug: '?activeTab=fdt',
      },
      {
        label: 'FDT Splitter',
        slug: '?activeTab=fdtSplitter',
      },
      {
        label: 'ODB',
        slug: '?activeTab=odb',
      },
      {
        label: 'ODB SDU',
        slug: '?activeTab=odbSdu',
      },
      {
        label: 'ODB MDU',
        slug: '?activeTab=odbMdu',
      },
      {
        label: 'CPE',
        slug: '?activeTab=cpe',
      },
    ],
  },
  // {
  //   label: 'B2C Accounts',
  //   slug: '/b2c_accounts',
  //   icon: 'contacts',
  // },

  {
    label: 'Products & Services', // B2B Catalog
    slug: '/b2b_catalog',
    icon: 'openBox',
    subMenu: [
      {
        label: 'B2B OSP Catalog', // B2B Catalog
        slug: '',    
        subMenu: [
          {
            label: 'Interconnect',
            slug: '?activeTab=interconnect',
          },
          {
            label: 'Residential',
            slug: '?activeTab=residential',
          },
          {
            label: 'Business',
            slug: '?activeTab=business',
          },
          {
            label: 'Ancillary',
            slug: '?activeTab=ancillary',
          },
          {
            label: 'Smarthome',
            slug: '?activeTab=smarthome',
          },
          {
            label: 'Smart Business',
            slug: '?activeTab=smartBusiness',
          }
        ],
      },
      {
        label: 'B2C OSP Catalog', // B2B Catalog
        slug: '',    
        subMenu: [
          {
            label: 'Interconnect',
            slug: '?activeTab=interconnect',
          },
          {
            label: 'Residential',
            slug: '?activeTab=residential',
          },
          {
            label: 'Business',
            slug: '?activeTab=business',
          },
          {
            label: 'Ancillary',
            slug: '?activeTab=ancillary',
          },
          {
            label: 'Smarthome',
            slug: '?activeTab=smarthome',
          },
          {
            label: 'Smart Business',
            slug: '?activeTab=smartBusiness',
          }
        ],
      },
      {
        label: '', // B2B Catalog
        slug: '',    
        // subMenu: [
        //   {
        //     label: 'Interconnect',
        //     slug: '?activeTab=interconnect',
        //   },
        //   {
        //     label: 'Residential',
        //     slug: '?activeTab=residential',
        //   },
        //   {
        //     label: 'Business',
        //     slug: '?activeTab=business',
        //   },
        //   {
        //     label: 'Ancillary',
        //     slug: '?activeTab=ancillary',
        //   },
        //   {
        //     label: 'Smarthome',
        //     slug: '?activeTab=smarthome',
        //   },
        //   {
        //     label: 'Smart Business',
        //     slug: '?activeTab=smartBusiness',
        //   }
        // ],
      },
    ],
  },
  {
    label: 'Subscriptions', // B2B Subscriptions
    slug: '/b2b_subscriptions',
    icon: 'bell',
    subMenu: [
      {
        label: 'B2B OSP Subscription', // B2B Catalog
        slug: '',    
        subMenu: [
          {
            label: 'Interconnect',
            slug: '?activeTab=interconnect',
          },
          {
            label: 'Residential',
            slug: '?activeTab=residential',
          },
          {
            label: 'Business',
            slug: '?activeTab=business',
          },
          {
            label: 'Ancillary',
            slug: '?activeTab=ancillary',
          },
          {
            label: 'Smarthome',
            slug: '?activeTab=smarthome',
          },
          {
            label: 'Smart Business',
            slug: '?activeTab=smartBusiness',
          }
        ],
      },
      {
        label: 'B2C OSP Subscription', // B2B Catalog
        slug: '',    
        subMenu: [
          {
            label: 'Interconnect',
            slug: '?activeTab=interconnect',
          },
          {
            label: 'Residential',
            slug: '?activeTab=residential',
          },
          {
            label: 'Business',
            slug: '?activeTab=business',
          },
          {
            label: 'Ancillary',
            slug: '?activeTab=ancillary',
          },
          {
            label: 'Smarthome',
            slug: '?activeTab=smarthome',
          },
          {
            label: 'Smart Business',
            slug: '?activeTab=smartBusiness',
          }
        ],
      },
    ],
    // subMenu: [
    //   {
    //     label: 'Interconnect',
    //     slug: '?activeTab=interconnect',
    //   },
    //   {
    //     label: 'Residential',
    //     slug: '?activeTab=residential',
    //   },
    //   {
    //     label: 'Business',
    //     slug: '?activeTab=business',
    //   },
    //   {
    //     label: 'Ancillary',
    //     slug: '?activeTab=ancillary',
    //   },
    //   {
    //     label: 'Smarthome',
    //     slug: '?activeTab=smarthome',
    //   },
    //   {
    //     label: 'Smart Business',
    //     slug: '?activeTab=smartBusiness',
    //   },
    // ],
  },
  {
    label: 'Order Processing',
    slug: '/order_processing',
    icon: 'settingsPage',
    subMenu: [
      {
        label: 'RSP Approval',
        slug: '?activeTab=RSPApproval',
      },
      {
        label: 'Appointments',
        slug: '?activeTab=Appointments',
      },
      {
        label: 'NOC Order Varification',
        slug: '?activeTab=NOCOrderVarification',
      },
      {
        label: 'Order claim Process',
        slug: '?activeTab=OrderclaimProcess',
      },
      {
        label: 'NOC Connection Verification',
        slug: '?activeTab=NOCConnectionVerification',
      },
      {
        label: 'Service Completion document creation',
        slug: '?activeTab=ncdc',
      },
      {
        label: 'RSP Service Acceptance',
        slug: '?activeTab=RSPServiceAcceptance',
      },
    ],
  },
//   Service Provider Order Process-B2C
// New Subscriptions
// Payment Claim
// Approve for Service
// Service Completion
// Service Acceptance
// Service Provider Order Invoices-B2C
// Orders Invoices
// Residentials Accounts
// Business Account
// Smart Services Account
// Service Provider Order Invoices-B2B
// Interconnect Accounts
// Residentials Accounts
// Business Account
// Smart Services Account
// Ancillary Service Accounts
// Due Invoice
// Paid Invoices
// Payment Sechdule
// Invoices B2B
// Created Invoices
// Payments Schedule Status
// Credit Notes
// Debit Notes
// Special Invoices
// Prepayments Accounts
// Post Payment Accounts

  {
    label: 'Billing Management',
    slug: '/billing_management',
    icon: 'dollarBill',
    subMenu: [
      {
        label: '  Service Provider Order Process-B2C', 
        slug: '',    
        subMenu: [
          {
            label: 'New Subscriptions',
            slug: '?activeTab=NewSubscriptions',
          },
          {
            label: 'Payment Claim',
            slug: '?activeTab=PaymentClaim',
          },
          {
            label: 'Approve for Service',
            slug: '?activeTab=ApproveforService',
          },
          {
            label: 'Service Completion',
            slug: '?activeTab=ServiceCompletion',
          },
          {
            label: 'Service Acceptance',
            slug: '?activeTab=smarthome',
          },
        ],
      },
      {
        label: 'Service Provider Order Invoices-B2C', 
        slug: '',    
        subMenu: [
          {
            label: 'Orders Invoices',
            slug: '?activeTab=OrdersInvoices',
          },
          {
            label: 'Residentials Accounts',
            slug: '?activeTab=ResidentialsAccounts',
          },
          {
            label: 'Business Account',
            slug: '?activeTab=BusinessAccount',
          },
          {
            label: 'Smart Services Account',
            slug: '?activeTab=SmartServicesAccount',
          },
        ],
      },
      {
        label: 'Service Provider Order Invoices-B2B', 
        slug: '',    
        subMenu: [
          {
            label: 'Interconnect Accounts',
            slug: '?activeTab=InterconnectAccounts',
          },
          {
            label: 'Residentials Accounts',
            slug: '?activeTab=ResidentialsAccounts',
          },
          {
            label: 'Business Account',
            slug: '?activeTab=BusinessAccount',
          },
          {
            label: 'Smart Services Account',
            slug: '?activeTab=SmartServicesAccount',
          },
          {
            label: 'Ancillary Service Accounts',
            slug: '?activeTab=AncillaryServiceAccounts',
          },
          {
            label: 'Due Invoice',
            slug: '?activeTab=DueInvoice',
          },
          {
            label: 'Paid Invoices',
            slug: '?activeTab=PaidInvoices',
          },
          {
            label: 'Payment Sechdule',
            slug: '?activeTab=PaymentSechdule',
          }
        ],
      },

      {
        label: 'Invoices B2B', 
        slug: '',    
        subMenu: [
          {
            label: 'Created Invoices',
            slug: '?activeTab=CreatedInvoices',
          },
          {
            label: 'Payments Schedule Status',
            slug: '?activeTab=PaymentsScheduleStatus',
          },
          {
            label: 'Credit Notes',
            slug: '?activeTab=CreditNotes',
          },
          {
            label: 'Debit Notes',
            slug: '?activeTab=DebitNotes',
          },
          {
            label: 'Special Invoices',
            slug: '?activeTab=SpecialInvoices',
          },
          {
            label: 'Prepayments Accounts',
            slug: '?activeTab=PrepaymentsAccounts',
          },
          {
            label: 'Post Payment Accounts',
            slug: '?activeTab=PostPaymentAccounts',
          }
        ],
      },
    ],
  },
  {
    label: 'Service Appointment',
    slug: '/service_appointment',
    icon: 'handshake',
    subMenu: [
      {
        label: 'Appointments',
        slug: '?activeTab=Appointments',
      },
    ],
  },
  {
    label: 'Order Management',
    slug: '/order_management',
    icon: 'settingsPage',
    subMenu: [
      {
        label: 'Active Orders',
        slug: '?activeTab=AO',
      },
      {
        label: 'Relocation Process',
        slug: '?activeTab=RP',
      },
      {
        label: 'Cancelation & Disconnection',
        slug: '?activeTab=CD',
      },
      {
        label: 'In Process Orders',
        slug: '?activeTab=IPO',
      },
      {
        label: 'Subscriptions Ending',
        slug: '?activeTab=SE',
      },
      {
        label: 'Inactive Accounts',
        slug: '?activeTab=IA',
      },
      {
        label: 'RSP Service Acceptance',
        slug: '?activeTab=RSPServiceAcceptance',
      },
    ],
  },

];

export default navigation;
