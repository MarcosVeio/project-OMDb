import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import { useHistory } from 'react-router-dom'

export const LayoutWithApp = ({ children }) => {
    const history = useHistory()
    const { Header, Content } = Layout;

    return (
        <Layout>
            <Header style={{ zIndex: 1, width: '100%' }}>
                <Menu theme="dark" mode="horizontal" className="menu">
                    <Menu.Item onClick={() => history.push('/')} key="1">Home</Menu.Item>
                    <Menu.Item onClick={() => history.push('/favourites')} key="2">My Favourites</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                <div className="site-layout-background" style={{ padding: 54, minHeight: '93vh' }}>
                    {children}
                </div>
            </Content>
        </Layout>
    )
}