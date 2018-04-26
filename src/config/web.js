export default ({ PORT, HTTP_HEADER_ORIGIN }) => ({
  port: PORT ? PORT : 3000,
  headerOrigin: HTTP_HEADER_ORIGIN ? HTTP_HEADER_ORIGIN : '*',
});
