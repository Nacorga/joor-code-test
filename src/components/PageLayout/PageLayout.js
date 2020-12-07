import './PageLayout.scss';

const PageLayoutComponent = ({ title, children }) => (
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
)

export default PageLayoutComponent;