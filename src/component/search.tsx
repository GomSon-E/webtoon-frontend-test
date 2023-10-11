import { Button, Input, Space } from 'antd';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const SearchComponent = () => {
    return (
        <Space direction="vertical">
            <Search 
                placeholder="search anything!"
                allowClear
                enterButton={
                    <Button
                        type="primary"
                        style={{ backgroundColor: '#00D465' }}
                    >Search
                    </Button>
                }
                size="large"
                onSearch={onSearch}
            />
        </Space>
    );
}
export default SearchComponent;