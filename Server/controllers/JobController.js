export const getJobs = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await services.getCurrent(id);
  
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return internalServerError(res);
    }
  };