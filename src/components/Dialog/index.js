import { Modal } from 'antd';
const App = (props) => {
  return (
    <>
      <Modal
        title={props.title}
        centered
        open={props.visible}
        onOk={() => props.callback(false,true)}
        onCancel={() => props.callback(false,false)}
        maskClosable={false}
      >
        {props.children}
      </Modal>
    </>
  );
};
export default App;