# Metal Academy CMS

A Strapi-based Content Management System for Metal Academy, designed to manage learning resources, modules, and sections.

## Features

- **Module Management**
  - Create and organize learning modules
  - Set module order and hierarchy
  - Add descriptions and metadata

- **Section Management**
  - Create sections within modules
  - Organize sections with custom ordering
  - Add detailed descriptions

- **Resource Management**
  - Support for multiple resource types:
    - Videos
    - Flows
    - External Links
  - Thumbnail support for resources
  - Resource ordering within sections

## Tech Stack

- Strapi v5
- SQLite (Development)
- Node.js >= 18.0.0
- TypeScript

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/metal-academy-cms.git
cd metal-academy-cms
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn develop
```

4. Access the admin panel at `http://localhost:1337/admin`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
ADMIN_JWT_SECRET=your-secret-key
API_TOKEN_SALT=your-salt
TRANSFER_TOKEN_SALT=your-transfer-salt
```

## Project Structure

```
metal-academy-cms/
├── src/
│   ├── api/              # API endpoints and controllers
│   ├── components/       # Reusable components
│   ├── config/          # Strapi configuration
│   └── extensions/      # Strapi extensions
├── public/              # Public assets
└── database/           # Database files
```

## Content Types

### Module
- Title (required, unique)
- Description
- Sections (many-to-many relationship)
- Section Orders (component)

### Section
- Title (required, unique)
- Description
- Modules (many-to-many relationship)
- Resources (many-to-many relationship)
- Resource Orders (component)

### Resource
- Title (required, unique)
- Description
- Type (video, flow, link)
- URL (required)
- Thumbnail (optional)
- Sections (many-to-many relationship)

## Deployment

This project is deployed on Strapi Cloud. For deployment:

1. Push changes to the main branch
2. Strapi Cloud will automatically deploy the changes
3. Set environment variables in the Strapi Cloud dashboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, please contact the development team.

# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
