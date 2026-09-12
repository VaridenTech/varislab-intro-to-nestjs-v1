export abstract class AppConfigService {
  abstract getEnvName(): string;
}

export class DevelopmentAppConfigService implements AppConfigService {
  getEnvName() {
    return 'development';
  }
}

export class ProductionAppConfigService implements AppConfigService {
  getEnvName() {
    return 'production';
  }
}
