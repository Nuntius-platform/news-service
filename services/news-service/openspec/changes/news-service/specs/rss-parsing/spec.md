## Purpose

Преобразовать данные из RSS-ленты во внутренний формат.

## ADDED Requirements

### Requirement: Преобразование RSS-публикаций

News Service MUST преобразовывать публикации из RSS в формат Article.

#### Scenario: RSS разобран

- **WHEN** сервис получает RSS-ленту
- **THEN** каждая публикация преобразуется в Article
