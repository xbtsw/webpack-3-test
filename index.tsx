import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mergeStyles, DefaultButton, Link } from 'office-ui-fabric-react';
import { Nav, INavLinkGroup, INavLink  } from '@m365-admin/admin-controls';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

export class NavExample extends React.Component<
  {},
  { isNavCollapsed: boolean; dir: string; isUsersExpanded: boolean; showTitleTeachingBubble: boolean }
> {
  constructor(props: {}) {
    super(props);
    this.state = { isNavCollapsed: false, dir: 'ltr', isUsersExpanded: false, showTitleTeachingBubble: false };
    this._onNavCollapsed = this._onNavCollapsed.bind(this);
    this._switchRTL = this._switchRTL.bind(this);
    this._toggleTeachingBubble = this._toggleTeachingBubble.bind(this);
    this._onDismiss = this._onDismiss.bind(this);
  }

  public render(): JSX.Element {
    const navLinkGroups: INavLinkGroup[] = [
      {
        key: 'group1',
        name: 'testing',
        showHeaderTeachingBubble: this.state.showTitleTeachingBubble,
        headerTeachingBubbleProps: {
          headline: 'Nav teaching bubble',
          onDismiss: this._onDismiss,
          primaryButtonProps: { children: 'primary' },
          secondaryButtonProps: { children: 'secondary' },
          // passing in custom styles to the bubble
          // note that this can be a function or an object
          // styles: { content: { background: 'pink' }, subComponentStyles: { callout: { beak: { background: 'purple' } } } },
          children: (
            <>
              Here is some content to put in a teaching bubble on the nav{' '}
              <Link href="http://www.microsoft.com" styles={{ root: { color: 'white' } }}>
                Link stuff
              </Link>
            </>
          )
        },
        styles: { navGroupTitle: { color: 'blue' } },
        links: [
          {
            name: 'Home',
            icon: 'Home',
            key: 'HomeLink1',
            ariaLabel: 'homestuff',
            'data-id': 'automation_id_22230',
            onClick: (_ev: React.MouseEvent<HTMLElement>, item: INavLink) => {
              console.log(item);
            }
          },
          {
            name: 'Users node managed by app',
            key: 'UsersLink',
            icon: 'Contact',
            title: 'Users menu item',
            navLinkGroupStyles: {
              nestedNavHeaderItem: {
                backgroundColor: 'green'
              },
              nestedNavHeaderItemText: {
                color: 'red'
              },
              nestedNavHeaderItemIcon: {
                color: 'red'
              }
            },
            'data-id': 'automation_id_22231',
            isExpanded: this.state.isUsersExpanded,
            onClick: (_ev: React.MouseEvent<HTMLElement>, item: INavLink) => {
              console.log(item);
            },
            onExpanded: (_expanded: boolean) => {
              this.setState({ isUsersExpanded: !this.state.isUsersExpanded });
            },
            links: [
              { name: 'Active users', key: 'activeLink', href: 'http://msn.com', isSelected: true },
              {
                name: 'Contacts - test with long name to show ellipse',
                key: 'contactLink',
                href: '#/examples/nav',
                onClick: (_ev: React.MouseEvent<HTMLElement>, item: INavLink) => {
                  console.log('some telemetry here', item);
                },
                title: 'contacts stuff',
                styles: {
                  root: {
                    background: 'pink'
                  }
                }
              },
              {
                name: 'Item with click and force <a>',
                key: 'randomItemLink',
                href: 'http://msn.com',
                target: '_blank',
                onClick: () => {
                  console.log('some telemetry here');
                },
                forceAnchor: true
              },
              { name: 'Guest users', key: 'usersKey', href: '#/examples/nav' },
              { name: 'Deleted users', key: 'deletedUsersKey', href: '#/examples/nav' }
            ]
          },
          { name: 'Groups', key: 'groupsKey', href: '#/examples/nav', icon: 'Group', isHidden: true },
          { name: 'Resources', key: 'ResourcesKey', href: '#/examples/nav', target: '_blank', icon: 'Devices4' },
          {
            name: 'Billing - test with long name to show ellipse',
            key: 'BillingKey',
            href: 'http://msn.com',
            target: '_blank',
            icon: 'PaymentCard'
          },
          {
            name: 'Support - unmanaged node',
            key: 'suportKey',
            icon: 'Headset',
            links: [
              { name: 'Chat', key: 'chatKey', href: 'http://msn.com' },
              {
                name: 'Email - test with long name to show ellipse',
                key: 'emailKey',
                href: 'http://msn.com',
                target: '_blank'
              }
            ]
          },
          { name: 'Settings', key: 'settingKey', href: 'http://example.com', icon: 'Settings' },
          { name: 'Setup', key: 'setupKey', href: 'http://msn.com', target: '_blank', icon: 'Repair' },
          { name: 'Reports', key: 'reportKey', href: 'http://example.com', icon: 'Chart' },
          { name: 'Health', key: 'healthKey', href: 'http://msn.com', target: '_blank', icon: 'Health' }
        ]
      },
      {
        name: 'Other admin centers',
        key: 'adminCenterGroup1',
        links: [
          {
            name: 'Other admin centers',
            key: 'adminCenterLinks',
            icon: 'Home',
            links: [
              { name: 'Security Center', key: 'SC', href: 'http://msn.com', target: '_blank' },
              { name: 'Device Management', key: 'DMLink', href: 'http://msn.com', target: '_blank' },
              { name: 'Azure Active Directory', key: 'AADLink', href: 'http://msn.com', target: '_blank' },
              { name: 'Exchange', key: 'exchangeLink', href: 'http://msn.com', target: '_blank' },
              { name: 'SharePoint', key: 'SPLink', href: 'http://msn.com', target: '_blank' }
            ]
          }
        ]
      }
    ];
    const mainStyle = mergeStyles({ display: 'flex', height: '800px' });
    const contentStyle = mergeStyles({ flex: '1 1 auto', padding: '24px' });
    return (
      <div className={mainStyle} dir={this.state.dir}>
        <Nav
          groups={navLinkGroups}
          enableCustomization={true}
          showMore={true}
          isNavCollapsed={this.state.isNavCollapsed}
          onNavCollapsed={this._onNavCollapsed}
          showMoreLinkProps={{ 'data-hint': 'telemetry test', name: 'Whatever Name I want' }}
          collapseNavLinkProps={{ 'data-hint': 'collapse test', name: 'Whatever Name I want' }}
        />
        <div className={contentStyle}>
          <h1>Content Here</h1>
          <DefaultButton onClick={this._switchRTL}>Switch Dir</DefaultButton>
          <DefaultButton onClick={this._toggleTeachingBubble}>Toggle Header TeachingBubble</DefaultButton>
        </div>
      </div>
    );
  }

  // handle onNavCollapsed since we are using the managed pattern
  // the callback passes the internal state of isNavCollapsed back but since
  // we are handling it on our own we don't need it hence the "_"
  private _onNavCollapsed(_isNavCollapsed: boolean): void {
    this.setState({ isNavCollapsed: !this.state.isNavCollapsed });
  }

  private _switchRTL(): void {
    this.setState({ dir: this.state.dir === 'ltr' ? 'rtl' : 'ltr' });
  }

  private _toggleTeachingBubble(): void {
    this.setState({ showTitleTeachingBubble: !this.state.showTitleTeachingBubble });
  }

  private _onDismiss(): void {
    this.setState({ showTitleTeachingBubble: false });
  }
}


initializeIcons();
const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
ReactDOM.render(<NavExample />, rootElement);
