import fetch from 'isomorphic-unfetch';

const Cors = async (req: any, res: any) => {
  const { url } = req.query;
  try {
    const resProxy = await fetch(url, {
      headers: {
        Range: 'bytes=0-5132288',
      },
    });
    const data = await resProxy.text();
    return res.status(200).send(data);
  } catch (error: any) {
    res.status(400).send(error.toString());
  }
};

export default Cors;
