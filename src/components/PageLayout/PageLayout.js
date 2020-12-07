import './PageLayout.scss';
import HeaderComponent from '../Header/Header';
import { Container } from 'react-bootstrap';

const PageLayoutComponent = ({ title, children }) => (

    <div className="page-wrapper">

        <HeaderComponent></HeaderComponent>

        <Container>
            <div className="page">
                <div className="page__header">
                    <h2 className="page__header-title">{title}</h2>
                </div>
                <div className="page__body">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </Container>

    </div>

)

export default PageLayoutComponent;