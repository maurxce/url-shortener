const corsOptions = {
  origin: "*",
  methods: "GET,POST",
};

const mongooseOptions = {
  authSource: "admin",
};

export { corsOptions, mongooseOptions };
