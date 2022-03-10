--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-03-09 23:26:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3308 (class 0 OID 16759)
-- Dependencies: 210
-- Data for Name: cuentas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuentas (id, saldo) FROM stdin;
3	20000
1	15000
2	25000
\.


--
-- TOC entry 3307 (class 0 OID 16754)
-- Dependencies: 209
-- Data for Name: transacciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transacciones (descripcion, fecha, monto, cuenta) FROM stdin;
Trasferencia cuenta 2 a cuenta 1	Mar 9th 22	20000	2
Trasferencia cuenta 1 a cuenta 2	Mar 9th 22	20000	1
Trasferencia cuenta 1 a cuenta 2	Mar 9th 22	5000	1
\.


-- Completed on 2022-03-09 23:26:17

--
-- PostgreSQL database dump complete
--

