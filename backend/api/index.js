module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.status(200).json({ status: 'Nexus Scholar API Online', endpoints: ['/api/stats', '/api/papers', '/api/comparisons', '/api/graph'] });
};
