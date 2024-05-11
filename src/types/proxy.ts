type Proxy = {
  protocol: string;
  host: string;
  port: string | number;

  username?: string;
  password?: string;
};

export default Proxy;
