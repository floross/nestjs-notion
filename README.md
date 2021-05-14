# Nestjs Notion

## Description

[Notion](https://notion.so/) is a powerfull all in one workspace where you can use as a tool for your whole team to write, plan and get organized.

This package aims to wrap the notion API to a nestjs module.

## Installation

```bash
npm i --save nestjs-notion
```

### Add to your module

```ts
import { NotionModule } from 'nestjs-notion';

@Module({
  imports: [
    NotionModule.forRoot({
      auth: process.env.NOTION_TOKEN,
    }),
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
```

### Use it directly from any of your service

```ts
import { NotionService } from 'nestjs-notion';

@Injectable()
export class MyService {
  constructor(private readonly notion: NotionService) {}

  async getDatabasesList() {
    return this.notion.database.list();
  }
}
```

### Roadmap

- [ ] Add nestjs logger bridge between notion and a optional logger

## Based on

This repository is based on [Kamil Myśliwiec](https://twitter.com/kammysliwiec) and [@nestjs/graphql](https://github.com/nestjs/graphql) repository

## License

[MIT licensed](LICENSE).
